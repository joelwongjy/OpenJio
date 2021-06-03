import { validate } from "class-validator";
import { Jio } from "../../entities/Jio";
import { JIO_CREATOR_ERROR } from "../../types/errors";
import { JioPostData } from "../../types/jios";
import { getRepository } from "typeorm";

class JioCreatorError extends Error {
  constructor(message: string) {
    super(message);
    this.name = JIO_CREATOR_ERROR;
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
