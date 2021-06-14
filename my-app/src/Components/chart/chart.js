import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Chart({ UserId, Username, Users, UsersKey, grid }) {

  return (
    <div className="chart">
      <h3 className="Userid">{UserId}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={Users}>
          <XAxis UsersKey="username" stroke="#5550bd" />
          <Line type="monotone" UsersKey={UsersKey} stroke="#5550bd" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}