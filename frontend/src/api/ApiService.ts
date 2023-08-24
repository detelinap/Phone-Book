import axios from "axios";
import { AxiosResponse } from "axios";
import { PhonebookEntry } from "../utils/types";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api/phonebook";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const fetchPhonebookEntries = async (): Promise<PhonebookEntry[]> => {
  try {
    const response: AxiosResponse<PhonebookEntry[]> = await api.get("/");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching phonebook entries");
  }
};

export const fetchEntryById = async (id: string): Promise<PhonebookEntry> => {
  try {
    const response: AxiosResponse<PhonebookEntry> = await api.get(`/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching entry by ID");
  }
};

export const updateEntry = async (
  id: string,
  updatedEntry: PhonebookEntry
): Promise<void> => {
  if (updatedEntry) {
    const jsonString = JSON.stringify(updatedEntry);

    try {
      await api.put(`/${id}`, jsonString, {
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error updating entry:", error);
    }
  } else {
    console.log("updatedEntry is empty");
  }
};

export const addPhonebookEntry = async (
  newEntry: Omit<PhonebookEntry, "id">
): Promise<void> => {
  const newEntryjsonString = JSON.stringify(newEntry);
  try {
    await api.post("/", newEntryjsonString, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    throw new Error("Error adding phonebook entry");
  }
};
