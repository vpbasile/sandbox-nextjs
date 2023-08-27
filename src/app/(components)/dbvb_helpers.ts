type expectedServerResponse = {
    serverUpSince: string;
    rowsReturned: number;
    dbResponse: any[];
};

/**
     * Returns the data minus the wrapper.  I KNOW I should get rid of this.
     */
export function unwrapData(data: expectedServerResponse) {
    const rowsReturned = data.rowsReturned;
    if (rowsReturned) {
        console.log(`Successful response from the server! Server has been up since ${data.serverUpSince}. Databse query returned ${rowsReturned} rows.`);
        // console.log(data.dbResponse);
        return data.dbResponse;
    }
    else return ([{ uid: 99, title: "Data unwrap failed", complete: false }]);
}