import React, { Component } from 'react';
import { Upload, message, Button, Icon, Layout, Table } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import ChartTypeGroup from '@/components/ChartTypeGroup';
import Dustbin from '@/components/Dustbin';
import DataForm from '@/components/DataForm';
import styles from './index.css';

import list_data from '../../mock/data';
import list_keys from '../../mock/keys';

import chart_type from '@/utils/data';
import { vsc2Json } from '@/utils';

const { Sider, Content } = Layout;

const options = {
  title: {
    text: 'My chart',
  },
  series: [
    {
      data: [1, 2, 3],
    },
  ],
};

const data_arr = [
  {
    model: '',
    count: 1,
    price: 1,
  },
];

class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chart_type,
    };
    this.all_keys = list_keys.map(({ key }) => key).filter(i => i);
    this.org_data = list_data;

    const that = this;
    this.upload_props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      // showUploadList: false,
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
          const reader = new FileReader();
          reader.onload = () => {
            const will_save = vsc2Json(reader.result);
            const { keys } = will_save;

            const all_keys = keys.map(({ key }) => key).filter(i => i);
            that.all_keys = all_keys;
            that.setState({
              ...will_save,
              data_keys: all_keys,
              rows_keys: all_keys,
              columns_keys: all_keys,
            });
          };
          reader.readAsText(info.file.originFileObj); // input.files[0]为第一个文件
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
  }

  handleFormChange = changedFields => {
    this.setState(({ fields }) => {
      const will_save = { ...fields, ...changedFields };

      return {
        fields: will_save,
      };
    });
  };

  render() {
    const {
      chart_type = [],
      list = list_data,
      keys = list_keys,
      data_keys = this.all_keys,
      rows_keys = this.all_keys,
      columns_keys = this.all_keys,
      fields = {},
    } = this.state;
    const upload_props = this.upload_props;

    const body = (
      <div className="flex ai-center">
        <label>Data Source</label>
        <Upload {...upload_props}>
          <Button>
            <Icon type="upload" /> Click to Upload data Source
          </Button>
        </Upload>
      </div>
    );

    return (
      <div className={styles.normal}>
        <DndProvider backend={Backend}>
          <Layout>
            <Sider width={280} className="t-left bg_side">
              <h5>Chart Type</h5>
              {chart_type.map(item => (
                <ChartTypeGroup key={item.name} {...item} />
              ))}
            </Sider>
            <Content className={styles.content}>
              {/* <Dustbin /> */}
              {body}
              {list.length > 0 ? <Table columns={keys} dataSource={list} size="small" /> : null}

              <HighchartsReact highcharts={Highcharts} options={options} />
            </Content>
            <Sider width={280} className="t-left bg_fff">
              <h5>Properties</h5>

              <DataForm
                {...{ ...fields, data_keys, rows_keys, columns_keys }}
                onChange={this.handleFormChange}
              />
              <pre className="language-bash">{JSON.stringify(fields, null, 2)}</pre>
            </Sider>
          </Layout>
        </DndProvider>
      </div>
    );
  }
}

export default IndexPage;
