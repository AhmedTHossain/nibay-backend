import axios from "axios";
import { DIVISION_API_URL } from "./constant";

export async function fetchDivisions() {
  try {
    const response = await axios.get(`${DIVISION_API_URL}/divisions`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function fetchDistrictByDivision(division: string) {
  try {
    const response = await axios.get(
      `${DIVISION_API_URL}/division/${division}`
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
