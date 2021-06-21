import { Request, Response } from "express";
import { JioCreator, JioGetter, JioDeleter, JioEditor } from "../services/jio";
import { SuccessId, TYPEORM_ENTITYNOTFOUND } from "../types/errors";
import {
  JioData,
  JioPatchData,
  JioPostData,
  JioUserData,
} from "src/types/jios";
import { getConnection } from "typeorm";
import { Jio } from "src/entities/Jio";

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

export async function showUserJios(
  request: Request<{ id: string }, any, any, any>,
  response: Response<SuccessId | JioUserData>
) {
  const { id } = request.params;

  try {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
      response.status(400).json({ success: false });
      return;
    }

    const jio = await new JioGetter().getUserOpenJios(idInt);

    response.status(200).json(jio);
    return;
  } catch (e) {
    switch (e.name) {
      case TYPEORM_ENTITYNOTFOUND:
        response.sendStatus(404);
        return;

      default:
        console.log(e);
        response.status(400).json({ success: false });
        return;
    }
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

    response.status(200).json(jio);
    return;
  } catch (e) {
    switch (e.name) {
      case TYPEORM_ENTITYNOTFOUND:
        response.sendStatus(404);
        return;

      default:
        console.log(e);
        response.status(400).json({ success: false });
        return;
    }
  }
}

export async function edit(
  request: Request<{ id: string }, any, JioPatchData, any>,
  response: Response<SuccessId>
): Promise<void> {
  const { id } = request.params;
  const editData = request.body;

  try {
    const idInt = parseInt(id, 10);
    if (isNaN(idInt)) {
      response.status(400).json({ success: false });
      return;
    }

    const jio = await new JioEditor().editJio(idInt, editData);

    response.status(200).json({ success: true, id: jio.id });
    return;
  } catch (e) {
    switch (e.name) {
      case TYPEORM_ENTITYNOTFOUND:
        response.sendStatus(404);
        return;

      default:
        console.log(e);
        response.status(400).json({ success: false });
        return;
    }
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

    await new JioDeleter().deleteJio(idInt);

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
