import csv from 'csvtojson'

exports.readCSV = (req, res) => {

  const {age, latitude, longitude, monthlyIncome, experienced} = req.query

  csv()
  .fromFile("./data/data.csv")
  .then((investor) => {

    // array to store result response of array
    const peopleLikeMe = []

    // score function to store in response array
    const setScore = (data) => {
      const ageScore = +data.age > +age ? +age / +data.age : +data.age / +age
      const latitudeScore = +data.latitude > +latitude ? +latitude/+data.latitude : +data.latitude/+latitude
      const longitudeScore = +data.longitude > +longitude ? +longitude/+data.longitude : +data.longitude/+longitude
      const monthlyIncomeScore = +data.monthlyIncome > +monthlyIncome ? +monthlyIncome/+data.monthlyIncome : +data.monthlyIncome/+monthlyIncome
      const resultScore = (ageScore + monthlyIncomeScore + latitudeScore + longitudeScore) / 4
      return resultScore.toFixed(2)
    }

    // filtering data based on given query
    const filterData = investor.filter((newInvestor) => {
      return newInvestor.experienced == experienced
    })

    // push response to an array
    filterData.map(data => {
      peopleLikeMe.push({
        age: data.age,
        name : data.name,
        latitude : data.latitude,
        longitude : data.longitude,
        monthlyIncome : data.monthlyIncome,
        experienced: data.experienced,
        score: setScore(data)
      })
    })

    // sort response to decsending array
    peopleLikeMe.sort((a, b) => b.score - a.score)
    
    res.status(200).send(peopleLikeMe.slice(0, 10))
  })
}
