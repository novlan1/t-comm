function updateChildId(data: {
  child_id_new?: number | string;
  child_id?: number | string;
}) {
  if (data?.child_id_new) {
    data.child_id = data.child_id_new;
  }
}

export function traverseResp(data: Record<string, any>, cb = updateChildId) {
  if (typeof data === 'object') {
    cb(data);

    if (Array.isArray(data)) {
      data.forEach(item => traverseResp(item));
    } else {
      Object.values(data).forEach(item => traverseResp(item));
    }
  }
}
