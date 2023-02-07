import React from "react";
import * as SQLite from 'expo-sqlite'

export const DbContext = React.createContext(SQLite.openDatabase('movies.db'))