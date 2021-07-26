export interface ItemListData {
  id: number;
  name: string;
  quantity: number;
  cost?: number;
}

export interface ItemPatchData {
  cost: number;
}
