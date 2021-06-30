import './sidebar.css';
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  Accessibility,
  BarChart,
  LocationCity,
  MailOutline,
  DynamicFeed,
  Public,
  ChatBubbleOutline,
  Category,
  Report,
  ViewModule,
  DirectionsCar,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Administrator</h3>

          <ul className="sidebarList">
            <Link to="/home" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
              Home 
            </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/employee" className="link">
              <li className="sidebarListItem">
                <Accessibility className="sidebarIcon" />
                Employee
              </li>
            </Link>
            <Link to="/department" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Department
              </li>
            </Link>
            <Link to="/city" className="link">
              <li className="sidebarListItem">
                <LocationCity className="sidebarIcon" />
                City
              </li>
            </Link>
            <Link to="/country" className="link">
              <li className="sidebarListItem">
                <Public className="sidebarIcon" />
                Country
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link to="/reports" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                Reports
              </li>
            </Link>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Automobile</h3>
          <ul className="sidebarList">
          <Link to="/auto" className="link">
              <li className="sidebarListItem">
                <DirectionsCar className="sidebarIcon" />
                Auto
              </li>
            </Link>
            <Link to="/origin" className="link">
              <li className="sidebarListItem">
                <DirectionsCar className="sidebarIcon" />
                Origin
              </li>
            </Link>
            <Link to="/extras" className="link">
              <li className="sidebarListItem">
                <DirectionsCar className="sidebarIcon" />
                Extras
              </li>
            </Link>
            <Link to="/details" className="link">
              <li className="sidebarListItem">
                <DirectionsCar className="sidebarIcon" />
                Details
              </li>
            </Link>
          <Link to="/brand" className="link">
              <li className="sidebarListItem">
                <Category className="sidebarIcon" />
                Brand
              </li>
            </Link>
            <Link to="/model" className="link">
              <li className="sidebarListItem">
                <ViewModule className="sidebarIcon" />
                Model
              </li>
            </Link>
            <li className="sidebarListItem">
              <Report className="sidebarIcon" />
              Reports
            </li>
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Jobs</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className="sidebarIcon" />
              Mail
            </li>
            <li className="sidebarListItem">
              <DynamicFeed className="sidebarIcon" />
              Feedback
            </li>
            <li className="sidebarListItem">
              <ChatBubbleOutline className="sidebarIcon" />
              Messages
            </li>
            <Link to="/logout" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Logout
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}