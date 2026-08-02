import { Card, Progress, Typography } from "antd";

const { Text, Title } = Typography;

const ProgressCard = ({
  title,
  value,
 percent,
  color,
}) => {
  return (
    <Card
      bordered={false}
      style={{
        borderRadius: 18,
        height: "100%",
      }}
    >
      <Text type="secondary">{title}</Text>

      <Title
        level={3}
        style={{ marginTop: 8 }}
      >
        {value}
      </Title>

      <Progress
        percent={percent}
        strokeColor={color}
        showInfo={false}
      />

      <Text>{percent}% Completed</Text>
    </Card>
  );
};

export default ProgressCard;