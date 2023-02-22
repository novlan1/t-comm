function updateChildId(data) {
  if (data?.child_id_new) {
    data.child_id = data.child_id_new;
  }
}

export function traverseResp(data, cb = updateChildId) {
  if (typeof data === 'object') {
    cb(data);

    if (Array.isArray(data)) {
      data.forEach(item => traverseResp(item));
    } else {
      Object.values(data).forEach(item => traverseResp(item));
    }
  }
}
