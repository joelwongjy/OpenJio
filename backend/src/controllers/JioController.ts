import { Request, Response } from "express";
import { JioCreator } from "../services/jio";
import { SuccessId } from "src/types/errors";
import { JioPostData } from "src/types/jios";

export async function create(
  request: Request<{}, any, JioPostData, any>,
  response: Response<SuccessId>
): Promise<void> {
  try {
    const jio = await new JioCreator().createJio(request.body);

    response.status(200).json({ success: true, id: jio.id });
    return;
  } catch (e) {
    console.log(e);
    response.status(400).json({ success: false });
    return;
  }
}
