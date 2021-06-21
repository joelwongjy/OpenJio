export interface Message {
  message: string;
}
export interface SuccessId {
  success: boolean;
  id?: number;
}

export const TYPEORM_ENTITYNOTFOUND = "EntityNotFound";

export const JIO_CREATOR_ERROR = "JioCreatorError";
export const JIO_EDITOR_ERROR = "JioEditorError";
export const ORDER_EDITOR_ERROR = "OrderEditorError";