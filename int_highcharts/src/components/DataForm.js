import { Form, Select } from 'antd';

const { Option } = Select;

const DataForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    const { columns_fields = {}, rows_fields = {}, data_fields = {} } = props;

    return {
      columns_fields: Form.createFormField({
        ...columns_fields,
        value: columns_fields.value,
      }),
      rows_fields: Form.createFormField({
        ...rows_fields,
        value: rows_fields.value,
      }),
      data_fields: Form.createFormField({
        ...data_fields,
        value: data_fields.value,
      }),
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  },
})(props => {
  const { data_keys = [], rows_keys = [], columns_keys = [] } = props;
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = props.form;

  const data_field_error = isFieldTouched('data_fields') && getFieldError('data_fields');
  const columns_field_error = isFieldTouched('columns_fields') && getFieldError('columns_fields');
  const rows_field_error = isFieldTouched('rows_fields') && getFieldError('rows_fields');

  return (
    <Form layout="vertical">
      <Form.Item
        label="Columns Fields"
        validateStatus={columns_field_error ? 'error' : ''}
        help={columns_field_error || ''}
      >
        {getFieldDecorator('columns_fields', {
          rules: [{ required: true, message: 'Please select Columns Fields!' }],
        })(
          <Select mode="multiple" placeholder="Please select" style={{ width: '100%' }}>
            {columns_keys.map(key => (
              <Option key={key}>{key}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item
        label="Rows Fields"
        validateStatus={rows_field_error ? 'error' : ''}
        help={rows_field_error || ''}
      >
        {getFieldDecorator('rows_fields', {
          rules: [{ required: true, message: 'Please select Rows Fields!' }],
        })(
          <Select mode="multiple" placeholder="Please select" style={{ width: '100%' }}>
            {rows_keys.map(key => (
              <Option key={key}>{key}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
      <Form.Item
        label="Data Fields"
        validateStatus={data_field_error ? 'error' : ''}
        help={data_field_error || ''}
      >
        {getFieldDecorator('data_fields', {
          rules: [{ required: true, message: 'Please select Data Fields!' }],
        })(
          <Select mode="multiple" placeholder="Please select" style={{ width: '100%' }}>
            {data_keys.map(key => (
              <Option key={key}>{key}</Option>
            ))}
          </Select>,
        )}
      </Form.Item>
    </Form>
  );
});

export default DataForm;
