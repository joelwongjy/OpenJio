import { Request, Response } from "express";
import { Order } from "../entities/Order";
import { OrderData, OrderPatchData } from "../types/orders";
import { getConnection, getRepository } from "typeorm";
import { SuccessId, TYPEORM_ENTITYNOTFOUND } from "../types/errors";
import { OrderEditor } from "../services/jio";

export async function show(
  request: Request<{ id: string }, {}, {}, {}>,
  response: Response<OrderData>
): Promise<void> {
  const { id } = request.params;

  try {
    const idInt = parseInt(id);
    if (!idInt) {
      response.status(400);
      return;
    }

    const order = await getRepository(Order).findOne({
      where: { id: idInt },
      relations: ["items"],
    });

    if (!order) {
      response.sendStatus(404);
      return;
    }

    const data = await order.getData();
    response.status(200).json(data);
    return;
  } catch (error) {
    console.log(error);
    response.status(400);
    return;
  }
}

export async function edit(
  request: Request<{ id: string }, {}, OrderPatchData, {}>,
  response: Response<SuccessId>
): Promise<void> {
  const { id } = request.params;
  const editData = request.body;

  try {
    const idInt = parseInt(id);
    if (!idInt) {
      response.status(400);
      return;
    }
    const order = await new OrderEditor().editOrder(idInt, editData);

    response.status(200).json({ success: true, id: order.id });
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
