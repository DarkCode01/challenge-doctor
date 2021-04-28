import { Rate, Comment, Typography, List } from "antd";

export default function Comments({ data }) {
  return (
    <List
      className="comment-list"
      header={
        <div>
          <Typography.Title level={5}>Reviews</Typography.Title>
        </div>
      }
      itemLayout="horizontal"
      dataSource={data}
      renderItem={(comment) => (
        <li>
          <Comment
            author={<Typography.Title level={5}>{comment.id}</Typography.Title>}
            content={<p>{comment.comment}</p>}
            datetime={
              <Rate
                style={{ fontSize: "120%" }}
                defaultValue={comment.starts}
                disabled
              />
            }
          />
        </li>
      )}
    />
  );
}
