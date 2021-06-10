import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Class } from "../entities/programme/Class";
import { Programme } from "../entities/programme/Programme";
import { User } from "../entities/user/User";
import { AccessTokenSignedPayload } from "../types/tokens";
import { DefaultUserRole } from "../types/users";

export type ProgrammeClassIds = {
  programmeIds: Set<number>;
  classIds: Set<number>;
};

/** Should be called after `checkBearerToken` */
export const findRelevantProgramClasses = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const payload = res.locals.payload as AccessTokenSignedPayload;
  const { userId } = payload;

  const user = await getRepository(User).findOne({
    select: ["id", "defaultRole"],
    where: { id: userId },
    relations: [
      "person",
      "person.classPersons",
      "person.classPersons.class",
      "person.classPersons.class.programme",
    ],
  });
  if (!user || !user.person) {
    res.sendStatus(401);
    return;
  }

  const programmeIds: Set<number> = new Set();
  const classIds: Set<number> = new Set();
  switch (user.defaultRole) {
    case DefaultUserRole.ADMIN:
      const programmes = await getRepository(Programme).find({
        select: ["id"],
      });
      const classes = await getRepository(Class).find({
        select: ["id"],
      });

      programmes.forEach((p) => programmeIds.add(p.id));
      classes.forEach((c) => classIds.add(c.id));

      break;
    case DefaultUserRole.USER:
      user.person.classPersons.forEach((cp) => {
        if (cp.discardedAt) {
          return;
        }
        programmeIds.add(cp.class.programme.id);
        classIds.add(cp.class.id);
      });

      break;
    default:
      console.log("Unexpected branch met in middleware");
      res.sendStatus(401);
      return;
  }

  res.locals.programmeClassIds = { programmeIds, classIds };
  next();
};
