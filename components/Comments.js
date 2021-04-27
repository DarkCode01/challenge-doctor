import { Rate, Comment, Typography, List } from 'antd';

export default function Comments({ data }) {
  return (
    <List
      className="comment-list"
      header={(
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography.Title level={5}>
            Reviews 
          </Typography.Title>

          <Rate defaultValue={3} disabled />
        </div>
      )}
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <li>
          <Comment
            author={<Typography.Title level={5}>Jose Segura</Typography.Title>}
            content={(
              <p>
                We supply a series of design principles, practical patterns and high quality design
                resources (Sketch and Axure), to help people create their product prototypes beautifully and
                efficiently.
              </p>
            )}
            datetime={(
              <Rate style={{ fontSize: '120%' }} defaultValue={2} disabled />
            )}
          />
        </li>
      )}
    />
  );
};
