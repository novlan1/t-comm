import { traverseResp } from '../../src';

describe('traverseResp', () => {
  it('traverseResp', () => {
    const data = {
      child_id_new: 111,
      data2: [
        {
          child_id_new: 222,
        },
      ],
      data3: {
        child_id_new: 333,
      },
    };
    traverseResp(data.data2);
    expect(data).toEqual({
      child_id_new: 111,
      data2: [{ child_id_new: 222, child_id: 222 }],
      data3: { child_id_new: 333 },
    });

    traverseResp(data);
    expect(data).toEqual({
      child_id_new: 111,
      data2: [{ child_id_new: 222, child_id: 222 }],
      data3: { child_id_new: 333, child_id: 333 },
      child_id: 111,
    });
  });
});
