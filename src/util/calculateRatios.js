export const calculateRatios = (isItGoodPast) => {
    const pushSafe = (input, array) => {
        if (input !== undefined) {
            array.push(input);
        } else {
            array.push('no data');
        }
    };

    let {
        cashAndCashEquivalents,
        years,
        operatingIncome,
        totalEquity,
        intangibleAssets,
        debt,
        preferredEquity,
        currentSharePrice,
        currentSharesOutstanding,
        infilation,
    } = isItGoodPast;

    let {
        maintainenceCapitalExpenditures,
        cashFlowFromOperations,
        nonInterestBearingCurrentLiabilities,

        numberOfSharesDiluted,
        totalAssets,

        totalLiabilities,

        interestExpense,
    } = isItGoodPast;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Capital Employed calculation
    let capitalEmployed = [];
    let capitalEmployedCalculation = [];
    let capitalEmployedCash = [];
    let capitalEmployedCashCalculation = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let capitalEmployedMinusCash =
            isItGoodPast.totalAssets[i] -
            isItGoodPast.nonInterestBearingCurrentLiabilities[i] -
            isItGoodPast.cashAndCashEquivalents[i];
        pushSafe(capitalEmployedMinusCash, capitalEmployed);
        let capitalEmployedMinusCashCalculation = `
            ${isItGoodPast.totalAssets[i]} -
            ${isItGoodPast.nonInterestBearingCurrentLiabilities[i]} -
            ${isItGoodPast.cashAndCashEquivalents[i]}`;
        pushSafe(
            capitalEmployedMinusCashCalculation,
            capitalEmployedCalculation
        );
        let capitalEmployedWithCash =
            isItGoodPast.totalAssets[i] -
            isItGoodPast.nonInterestBearingCurrentLiabilities[i];
        pushSafe(capitalEmployedWithCash, capitalEmployedCash);
        let capitalEmployedWithCashCalculation = `
            ${isItGoodPast.totalAssets[i]} -
            ${isItGoodPast.nonInterestBearingCurrentLiabilities[i]}`;
        pushSafe(
            capitalEmployedWithCashCalculation,
            capitalEmployedCashCalculation
        );
    }

    //helper functions

    const roundNumber = (number) => {
        return Math.round(number * 100) / 100;
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Return on capital employed

    let rocePresent = [];
    let rocePast = [];
    let roceCashPresent = [];
    let roceCashPast = [];
    let roceAverage = [];

    let rocePresentCalculation = [];
    let rocePastCalculation = [];
    let roceCashPresentCalculation = [];
    let roceCashPastCalculation = [];
    let roceAverageCalculation = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let rocePresentOne =
            Math.round((operatingIncome[i] / capitalEmployed[i]) * 10000) / 100;
        rocePresent.push(rocePresentOne);
        rocePresentCalculation.push(
            `(${operatingIncome[i]} / ${capitalEmployed[i]}) * 100`
        );

        let roceCashPresentOne =
            Math.round((operatingIncome[i] / capitalEmployedCash[i]) * 10000) /
            100;
        roceCashPresent.push(roceCashPresentOne);
        roceCashPresentCalculation.push(
            `(${operatingIncome[i]} / ${capitalEmployedCash[i]}) * 100`
        );

        if (capitalEmployed[i + 1] !== undefined) {
            let rocePastOne =
                Math.round(
                    (operatingIncome[i] / capitalEmployed[i + 1]) * 10000
                ) / 100;
            rocePast.push(rocePastOne);
            rocePastCalculation.push(
                `(${operatingIncome[i]} / ${capitalEmployed[i + 1]}) * 100`
            );

            let roceCashPastOne =
                Math.round(
                    (operatingIncome[i] / capitalEmployedCash[i + 1]) * 10000
                ) / 100;
            roceCashPast.push(roceCashPastOne);
            roceCashPastCalculation.push(
                `(${operatingIncome[i]} / ${capitalEmployedCash[i + 1]}) * 100`
            );

            let roceAverageOne =
                Math.round(
                    ((roceCashPresentOne +
                        roceCashPastOne +
                        rocePresentOne +
                        rocePastOne) *
                        100) /
                        4
                ) / 100;
            roceAverage.push(roceAverageOne);
            roceAverageCalculation.push(
                `(${roceCashPresentOne} + ${roceCashPastOne} + ${rocePresentOne} + ${rocePastOne}) / 4`
            );
        } else {
            let rocePastOne = 'no data';
            rocePast.push(rocePastOne);

            let roceCashPastOne = 'no data';
            roceCashPast.push(roceCashPastOne);

            let roceAverageOne = (roceCashPresentOne + rocePresentOne) / 2;
            roceAverage.push(roceAverageOne);
            roceAverageCalculation.push(
                `(${roceCashPresentOne} + ${rocePresentOne} ) / 2`
            );
        }
    }
    let historicalRoceAverage = 0;
    let historicalRoceAverageCalculation = '';

    for (let i = 0; i < years.length; i++) {
        historicalRoceAverage = historicalRoceAverage + roceAverage[i];
        historicalRoceAverageCalculation =
            historicalRoceAverageCalculation + `(${historicalRoceAverage} +`;
    }

    historicalRoceAverageCalculation =
        historicalRoceAverageCalculation.slice(0, -1) + `) / ${years.length}`;

    historicalRoceAverage = roundNumber(historicalRoceAverage / years.length);

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Free Cash Flow Return On capital Employed

    let freeCashFlow = [];
    let freeRocePresent = [];
    let freeRocePast = [];
    let freeRoceCashPresent = [];
    let freeRoceCashPast = [];
    let freeRoceAverage = [];

    // let freeCashFlowCalculation = [];
    // let freeRocePresentCalculation = [];
    // let freeRocePastCalculation = [];
    // let freeRoceCashPresentCalculation = [];
    // let freeRoceCashPastCalculation = [];
    // let freeRoceAverageCalculation = [];

    for (let i = 0; i < isItGoodPast.years.length; i++) {
        let freeCashFlowOne = roundNumber(
            isItGoodPast.cashFlowFromOperations[i] -
                isItGoodPast.maintainenceCapitalExpenditures[i]
        );
        freeCashFlow.push(freeCashFlowOne);

        let freeRocePresentOne =
            Math.round((freeCashFlowOne / capitalEmployed[i]) * 10000) / 100;
        freeRocePresent.push(freeRocePresentOne);

        let freeRoceCashPresentOne =
            Math.round((freeCashFlowOne / capitalEmployedCash[i]) * 10000) /
            100;
        freeRoceCashPresent.push(freeRoceCashPresentOne);

        if (capitalEmployed[i + 1] !== undefined) {
            let freeRocePastOne =
                Math.round((freeCashFlowOne / capitalEmployed[i + 1]) * 10000) /
                100;
            freeRocePast.push(freeRocePastOne);

            let freeRoceCashPastOne =
                Math.round(
                    (freeCashFlowOne / capitalEmployedCash[i + 1]) * 10000
                ) / 100;
            freeRoceCashPast.push(freeRoceCashPastOne);

            let freeRoceAverageOne =
                Math.round(
                    ((freeRoceCashPresentOne +
                        freeRoceCashPastOne +
                        freeRocePresentOne +
                        freeRocePastOne) *
                        100) /
                        4
                ) / 100;
            freeRoceAverage.push(freeRoceAverageOne);
        } else {
            let freeRocePastOne = 'no data';
            freeRocePast.push(freeRocePastOne);

            let freeRoceCashPastOne = 'no data';
            freeRoceCashPast.push(freeRoceCashPastOne);

            let freeRoceAverageOne =
                (freeRoceCashPresentOne + freeRocePresentOne) / 2;
            freeRoceAverage.push(freeRoceAverageOne);
        }
    }
    let historicalFreeRoceAverage = 0;

    for (let i = 0; i < years.length; i++) {
        historicalFreeRoceAverage =
            historicalFreeRoceAverage + freeRoceAverage[i];
    }

    historicalFreeRoceAverage = roundNumber(
        historicalFreeRoceAverage / years.length
    );

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //growth in operating income per share
    let growthShareOI = [];
    let shareOI = [];

    for (let i = 0; i < years.length; i++) {
        shareOI.push(operatingIncome[i] / numberOfSharesDiluted[i]);
    }

    for (let i = 0; i < years.length; i++) {
        if (shareOI[i + 1] !== undefined) {
            growthShareOI.push(
                roundNumber(
                    ((shareOI[i] - shareOI[i + 1]) / shareOI[i + 1]) * 100
                )
            );
            console.log(`(${shareOI[i]}-${shareOI[i + 1]})/${shareOI[i + 1]}`);
        } else {
            growthShareOI.push('no data');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //growth in FCF per share
    let growthShareFCF = [];
    let shareFCF = [];

    for (let i = 0; i < years.length; i++) {
        shareFCF.push(freeCashFlow[i] / numberOfSharesDiluted[i]);
    }

    for (let i = 0; i < years.length; i++) {
        if (shareFCF[i + 1] !== undefined) {
            growthShareFCF.push(
                roundNumber(
                    ((shareFCF[i] - shareFCF[i + 1]) / shareFCF[i + 1]) * 100
                )
            );
        } else {
            growthShareFCF.push('no data');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //growth in Book Value income per share

    let growthShareBookValue = [];
    let shareBookValue = [];

    for (let i = 0; i < years.length; i++) {
        shareBookValue.push(totalEquity[i] / numberOfSharesDiluted[i]);
    }

    for (let i = 0; i < years.length; i++) {
        if (shareBookValue[i + 1] !== undefined) {
            growthShareBookValue.push(
                roundNumber(
                    ((shareBookValue[i] - shareBookValue[i + 1]) /
                        shareBookValue[i + 1]) *
                        100
                )
            );
        } else {
            growthShareBookValue.push('no data');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //growth in Tangible Book Value income per share

    let tangibleBookValue = [];
    for (let i = 0; i < years.length; i++) {
        tangibleBookValue.push(totalEquity[i] - intangibleAssets[i]);
    }

    let growthShareTangibleBookValue = [];
    let shareTangibleBookValue = [];

    for (let i = 0; i < years.length; i++) {
        shareTangibleBookValue.push(
            tangibleBookValue[i] / numberOfSharesDiluted[i]
        );
    }

    for (let i = 0; i < years.length; i++) {
        if (shareTangibleBookValue[i + 1] !== undefined) {
            growthShareTangibleBookValue.push(
                roundNumber(
                    ((shareTangibleBookValue[i] -
                        shareTangibleBookValue[i + 1]) /
                        shareTangibleBookValue[i + 1]) *
                        100
                )
            );
        } else {
            growthShareTangibleBookValue.push('no data');
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Liabilities to equity ratio

    let liabilitiesToEquityRatio = [];
    for (let i = 0; i < years.length; i++) {
        liabilitiesToEquityRatio.push(
            roundNumber((totalLiabilities[i] / totalEquity[i]) * 100)
        );
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Debt to equity ratio

    let debtToEquityRatio = [];
    for (let i = 0; i < years.length; i++) {
        debtToEquityRatio.push(roundNumber((debt[i] / totalEquity[i]) * 100));
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Interest coverage ratio

    let interestCoverageRatio = [];
    for (let i = 0; i < years.length; i++) {
        interestCoverageRatio.push(
            roundNumber(operatingIncome[i] / interestExpense[i])
        );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MarketCapitalization calcutalion
    let marketCap = [];

    for (let i = 0; i < years.length; i++) {
        marketCap.push(currentSharePrice[i] * currentSharesOutstanding[i]);
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // MarketCapitalization calcutalion
    let enterpriseValue = [];
    let enterpriseValueCash = [];

    for (let i = 0; i < years.length; i++) {
        enterpriseValue.push(marketCap[i] + debt[i] + preferredEquity[i]);
    }

    for (let i = 0; i < years.length; i++) {
        enterpriseValueCash.push(
            enterpriseValue[i] - cashAndCashEquivalents[i]
        );
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Inxepensiveness ratios
    let mcapFCF = [];
    let mcapBV = [];
    let mcapTBV = [];
    let evOI = [];
    let evCashOI = [];

    for (let i = 0; i < years.length; i++) {
        mcapFCF.push(
            marketCap[i] /
                (isItGoodPast.cashFlowFromOperations[i] -
                    isItGoodPast.maintainenceCapitalExpenditures[i])
        );
        mcapBV.push(marketCap[i] / totalEquity[i]);
        mcapTBV.push(marketCap[i] / tangibleBookValue[i]);

        evOI.push(enterpriseValue[i] / operatingIncome[i]);
        evCashOI.push(enterpriseValueCash[i] / operatingIncome[i]);
    }

    let ratios = {
        mcapBV,
        mcapFCF,
        mcapTBV,
        evOI,
        evCashOI,
        enterpriseValue,
        enterpriseValueCash,
        years,
        marketCap,
        infilation,
        rocePresent,
        rocePast,
        roceCashPresent,
        roceCashPast,
        freeRocePresent,
        freeRoceCashPast,
        freeRoceCashPresent,
        freeCashFlow,
        capitalEmployedCash,
        totalAssets,
        totalEquity,
        debt,
        freeRocePast,
        growthShareOI,
        growthShareFCF,
        growthShareBookValue,
        growthShareTangibleBookValue,
        liabilitiesToEquityRatio,
        debtToEquityRatio,
        interestCoverageRatio,
        operatingIncome,
        interestExpense,
        cashFlowFromOperations,
        maintainenceCapitalExpenditures,
        cashAndCashEquivalents,
        nonInterestBearingCurrentLiabilities,
        capitalEmployed,
        tangibleBookValue,
        totalLiabilities,
        numberOfSharesDiluted,

        capitalEmployedCalculation,

        capitalEmployedCashCalculation,

        rocePresentCalculation,

        roceCashPresentCalculation,
        rocePastCalculation,
        roceCashPastCalculation,
        roceAverage,
        roceAverageCalculation,
        historicalRoceAverage,
        historicalRoceAverageCalculation,

        freeRoceAverage,
        historicalFreeRoceAverage,
    };

    return ratios;
};

export const makeNumberNice = (number, sign) => {
    let niceNumber;
    if (number === undefined) {
        niceNumber = '0';
    } else {
        niceNumber = number.toLocaleString();
    }

    if (sign) {
        niceNumber = niceNumber + sign;
    }
    return niceNumber;
};

export const makeIntoRow = (name, metric, years) => {
    let rowData = { name };
    for (let i = 0; i < years.length; i++) {
        rowData[years[i]] = metric[i];

        rowData[`${years[i]}sign}`] = '';

        if (
            name.substring(0, 6) === 'MCAP/F' &&
            metric[i] <= 6 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (
            name.substring(0, 6) === 'MCAP/F' &&
            metric[i] <= 8 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (
            name.substring(0, 6) === 'MCAP/F' &&
            metric[i] <= 9 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 6) === 'MCAP/F') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (name.substring(0, 2) === 'EV' && metric[i] <= 5 && metric[i] > 0) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (
            name.substring(0, 2) === 'EV' &&
            metric[i] <= 7 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (
            name.substring(0, 2) === 'EV' &&
            metric[i] <= 8 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 2) === 'EV') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (
            name.substring(0, 6) === 'MCAP/T' &&
            metric[i] <= 2 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (
            name.substring(0, 6) === 'MCAP/T' &&
            metric[i] <= 3 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (
            name.substring(0, 6) === 'MCAP/T' &&
            metric[i] <= 3.5 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 6) === 'MCAP/T') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (
            name.substring(0, 6) === 'MCAP/B' &&
            metric[i] <= 2 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (
            name.substring(0, 6) === 'MCAP/B' &&
            metric[i] <= 3 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (
            name.substring(0, 6) === 'MCAP/B' &&
            metric[i] <= 3.5 &&
            metric[i] > 0
        ) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 6) === 'MCAP/B') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (typeof metric[i] !== 'number' || isNaN(metric[i]) === true) {
            rowData[`${years[i]}color}`] = 'nothing';
        }
    }

    return rowData;
};

export const makeIntoRowGoodPast = (name, metric, years, infilation) => {
    let rowData = { name };
    for (let i = 0; i < years.length; i++) {
        rowData[years[i]] = metric[i];

        if (
            name.substring(0, 4) === 'ROCE' ||
            name.substring(0, 4) === 'Grow' ||
            name.substring(0, 4) === 'FCFR' ||
            name.substring(0, 14) === 'Liabilities to' ||
            name.substring(0, 7) === 'Debt to' ||
            name.substring(0, 3) === 'Inf'
        ) {
            rowData[`${years[i]}sign}`] = '%';
        } else {
            rowData[`${years[i]}sign}`] = '';
        }

        if (name.substring(0, 4) === 'ROCE' && metric[i] >= 20) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (name.substring(0, 4) === 'ROCE' && metric[i] >= 15) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (name.substring(0, 4) === 'ROCE' && metric[i] >= 10) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 4) === 'ROCE') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (name.substring(0, 4) === 'FCFR' && metric[i] >= 11) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (name.substring(0, 4) === 'FCFR' && metric[i] >= 8) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (name.substring(0, 4) === 'FCFR' && metric[i] >= 5) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 4) === 'FCFR') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (name.substring(0, 4) === 'Grow' && metric[i] >= infilation[i] + 5) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (
            name.substring(0, 4) === 'Grow' &&
            metric[i] >= infilation[i]
        ) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (
            name.substring(0, 4) === 'Grow' &&
            metric[i] >= infilation[i] - 1
        ) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 4) === 'Grow') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (name.substring(0, 4) === 'Liab' && metric[i] <= 200) {
            rowData[`${years[i]}color}`] = 'green';
        } else if (name.substring(0, 4) === 'Liab' && metric[i] <= 300) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 4) === 'Liab') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (name.substring(0, 4) === 'Debt' && metric[i] <= 400) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (name.substring(0, 4) === 'Debt' && metric[i] <= 500) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 4) === 'Debt') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (name.substring(0, 4) === 'Inte' && metric[i] >= 5) {
            rowData[`${years[i]}color}`] = 'veryGreen';
        } else if (name.substring(0, 4) === 'Inte' && metric[i] >= 4) {
            rowData[`${years[i]}color}`] = 'orange';
        } else if (name.substring(0, 4) === 'Inte') {
            rowData[`${years[i]}color}`] = 'red';
        }

        if (typeof metric[i] !== 'number' || isNaN(metric[i]) === true) {
            rowData[`${years[i]}color}`] = 'nothing';
            rowData[`${years[i]}sign}`] = '';
        }
    }

    return rowData;
};
