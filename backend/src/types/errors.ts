export interface Message {
  message: string;
}

export interface SuccessId {
  success: boolean;
  id?: number;
}

export const TYPEORM_ENTITYNOTFOUND = "EntityNotFound";

export const JIO_CREATOR_ERROR = "JioCreatorError";
