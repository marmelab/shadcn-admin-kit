import fakeRestDataProvider from "ra-data-fakerest";
import generateData from "data-generator-retail";

const data = generateData();
export const dataProvider = fakeRestDataProvider(data, true);
