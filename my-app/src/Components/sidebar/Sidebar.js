import './sidebar.css';
import {
  LineStyle,
  PermIdentity,
  Storefront,
  Accessibility,
  LocationCity,
  AttachMoney,
  DynamicFeed,
  Public,
  ChatBubbleOutline,
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
            <Link to="/report" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Report
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
                Place
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
          </ul>
        </div>

        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Jobs</h3>
          <ul className="sidebarList">
            <Link to="/tasks" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Tasks
              </li>
            </Link>
            <Link to="/sales" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Sales
              </li>
            </Link>
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