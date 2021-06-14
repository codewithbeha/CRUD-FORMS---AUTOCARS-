import Chart from '../Components/chart/chart';
import FeaturedInfo from "../Components/featuredInfo/FeaturedInfo";
import '../Pages/home.css';
import { Users } from "../Pages/Users";
import WidgetSm from "../Components/widgetSm/WidgetSm";
import WidgetLg from "../Components/widgetLg/WidgetLg";

export default function Home() {
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={Users} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
      <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
