import { validate } from "class-validator";
import { Jio } from "../../entities/Jio";
import { JIO_CREATOR_ERROR } from "../../types/errors";
import { JioData, JioListData, JioPostData } from "../../types/jios";
import { getRepository, MoreThan } from "typeorm";

class JioCreatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = JIO_CREATOR_ERROR;
  }
}

export class JioGetter {
  public async getJios(jioIds: number[]): Promise<Jio[]> {
    const programmes =
      jioIds.length === 0
        ? []
        : await getRepository(Jio).find({
            where: jioIds.map((id) => {
              return { id };
            }),
          });
    return programmes;
  }

  public async getJioList(): Promise<JioListData[]> {
    const query = await getRepository(Jio).find({
      where: {
        closeAt: MoreThan(new Date()),
      },
      relations: ["joinedUsers"],
    });
    const result = query.map((j) => {
      return {
        ...j.getBase(),
        name: j.name,
        createdAt: j.createdAt,
        closeAt: j.closeAt,
        user: j.user,
        orderLimit: j.orderLimit,
        orderCount: j.joinedUsers.length,
      };
    });
    return result;
  }

  public async getJio(id: number): Promise<JioData | undefined> {
    const jio = await getRepository(Jio).findOne({
      where: { id },
      relations: ["joinedUsers"],
    });

    if (!jio) {
      return undefined;
    }

    const result: JioData = {
      ...jio.getBase(),
      name: jio.name,
      createdAt: jio.createdAt,
      closeAt: jio.closeAt,
      user: jio.user,
      orderLimit: jio.orderLimit,
      orderCount: jio.joinedUsers.length,
      joinedUsers: jio.joinedUsers,
      paymentNumber: jio.paymentNumber,
    };

    return result;
  }
}
export class JioCreator {
  public async createJio(createData: JioPostData): Promise<Jio> {
    const { name, closeAt, paymentNumber, user, orderLimit } = createData;

    let jio: Jio = new Jio(name, closeAt, paymentNumber, user, orderLimit);
    const errors = await validate(jio);
    if (errors.length > 0) {
      throw new JioCreatorError(
        `Provided Jio details (name: ${name}, closeAt: ${closeAt}) ` +
          `failed validation checks (failed properties: ${errors.map(
            (e) => e.property
          )})`
      );
    }

    jio = await getRepository(Jio).save(jio);
    return jio;
  }
}

export class JioDeleter {
  public async deleteJio(id: number) {
    const jio = await getRepository(Jio).findOneOrFail({
      select: ["id"],
      where: { id },
      relations: ["joinedUsers"],
    });
    
    await getRepository(Jio).remove(jio);
  }
}
