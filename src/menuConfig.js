export const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fallbackMenus = [
  { id: 1, name: "AllStudents", path: "/students" },
  { id: 2, name: "AddStudent", path: "/add-student" }
];

export const normalizeMenu = (menu) => ({
  id: menu.id ?? menu.Id,
  name: menu.name ?? menu.Name,
  path: menu.path ?? menu.Path
});

export const formatMenuName = (name) =>
  String(name || "")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .trim();
