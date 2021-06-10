import { Request, Response } from "express";
import { JioCreator, JioGetter } from "../services/jio";
import { SuccessId } from "src/types/errors";
import { JioListData, JioPostData } from "src/types/jios";

export async function index(
  _request: Request<{}, any, any, any>,
  response: Response<SuccessId | { jios: JioListData[] }>
): Promise<void> {
  try {
    const jios = await new JioGetter().getJioList();
    response.status(200).json({ jios });
    return;
  } catch (e) {
    console.log(e);
    response.status(400).json({ success: false });
    return;
  }
}

export async function create(
  request: Request<{}, any, JioPostData, any>,
  response: Response<SuccessId>
): Promise<void> {
  try {
    const jio = await new JioCreator().createJio(request.body);

    response.status(200).json({ success: true, id: jio.id });
    console.log(jio)
    return;
  } catch (e) {
    console.log(e);
    response.status(400).json({ success: false });
    return;
  }
}
