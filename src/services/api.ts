import axios from "axios";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiBaseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
});

export const api = axios.create({
  baseURL: "http://localhost:5000",
});
