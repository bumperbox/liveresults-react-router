import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/competitions", "routes/competitions.tsx"),
    route("/competitions/:uuid", "routes/competition.tsx"),
    route("/competitions/:uuid/schedule", "routes/schedule.tsx")
] satisfies RouteConfig;
