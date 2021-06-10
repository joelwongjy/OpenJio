import { Request, Response } from "express";
import { JioCreator, JioGetter, JioDeleter } from "../services/jio";
import { SuccessId, TYPEORM_ENTITYNOTFOUND } from "../types/errors";
import { JioData, JioListData, JioPostData } from "src/types/jios";

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
    console.log(jio);
    return;
  } catch (e) {
    console.log(e);
    response.status(400).json({ success: false });
    return;
  }
}

export async function show(
  request: Request<{ id: string }, any, any, any>,
  response: Response<SuccessId | JioData>
) {
  const { id } = request.params;

  try {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
      response.status(400).json({ success: false });
      return;
    }

    const jio = await new JioGetter().getJio(idInt);
    if (!jio) {
      response.status(404).json({ success: false });
      return;
    }
    response.status(200).json(jio);
    return;
  } catch (e) {
    console.log(e);
    response.status(400).json({ success: false });
    return;
  }
}

export async function remove(
  request: Request<{ id: string }, any, any, any>,
  response: Response<SuccessId>
): Promise<void> {
  const { id } = request.params;
  try {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
      response.status(400).json({ success: false });
      return;
    }

    const deleter = new JioDeleter();
    await deleter.deleteJio(idInt);

    response.status(200).json({ success: true, id: idInt });
    return;
  } catch (e) {
    switch (e.name) {
      case TYPEORM_ENTITYNOTFOUND:
        response.status(404).json({ success: false });
        return;

      default:
        console.log(e);
        response.status(400).json({ success: false });
        return;
    }
  }
}
