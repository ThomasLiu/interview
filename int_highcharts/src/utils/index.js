exports.vsc2Json = text => {
  const arr = text.split('\n');
  const [line_1, ...data] = arr;
  const keys_arr = line_1.split(';');

  const list = data.map((item, index) => {
    const item_arr = item.split(';');
    const item_obj = {};
    for (let i = 0; i < item_arr.length; i++) {
      item_obj[keys_arr[i]] = item_arr[i];
    }
    item_obj.key = index;
    return item_obj;
  });
  const keys = keys_arr.map(key => ({
    title: key,
    key,
    dataIndex: key,
  }));
  return {
    keys,
    list,
  };
};

const getValue = (fields = {}) => {
  const { columns_fields = {}, rows_fields = {}, data_fields = {} } = fields;

  return {
    columns_fields: columns_fields.value || [],
    rows_fields: rows_fields.value || [],
    data_fields: data_fields.value || [],
  };
};

exports.changeData = ({ keys = [], fields = {}, data = [] }) => {
  const { columns_fields = [], rows_fields = [], data_fields = [] } = getValue(fields);

  data.map(item => {
    const obj = {};

    for (let j = 0; j < columns_fields.length; j++) {
      const column = columns_fields[j];

      const a = data[column];
    }
  });

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
  }
};
