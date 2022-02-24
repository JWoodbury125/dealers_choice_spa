const Sequelize = require('sequelize')
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/nfl_spa')

const Team = db.define('team', {
    name: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }

    }
})

const Division = db.define('division', {
    name: {
        type: Sequelize.STRING,
        allowsNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    }
})

Team.belongsTo(Division)
Division.hasMany(Team)

const syncAndSeed = async (req, res) => {
    try{
        await db.sync( {force: true} )
        console.log("db connected")
        const afcNorth = await Division.create({name: 'AFC_NORTH'})
        const afcSouth = await Division.create({name: 'AFC_SOUTH'})
        const afcEast = await Division.create({name: 'AFC_EAST'})
        const afcWest = await Division.create({name: 'AFC_WEST'})
        const nfcNorth = await Division.create({name: 'NFC_NORTH'})
        const nfcSouth = await Division.create({name: 'NFC_SOUTH'})
        const nfcEast = await Division.create({name: 'NFC_EAST'})
        const nfcWest = await Division.create({name: 'NFC_WEST'})
        await Team.create({name: 'Arizona Cardinals', divisionId: afcNorth.id})
        await Team.create({name: 'Cleveland Browns', divisionId: afcNorth.id})
        await Team.create({name: 'Baltimore Ravens', divisionId: afcNorth.id})
        await Team.create({name: 'Cincinnati Bengals', divisionId: afcNorth.id})
        await Team.create({name: 'Atlanta Falcons', divisionId: nfcSouth.id})
        await Team.create({name: 'Indianapolis Colts', divisionId: nfcSouth.id})
        await Team.create({name: 'Dallas Cowboys', divisionId: nfcEast.id})
        await Team.create({name: 'New York Giants', divisionId: nfcEast.id})
        await Team.create({name: 'Philadelphia Eagles', divisionId: nfcEast.id})
        await Team.create({name: 'Los Angeles Rams', divisionId: nfcWest.id})
        await Team.create({name: 'Seattle Seahawks', divisionId: nfcWest.id})
        await Team.create({name: 'Minnesota Vikings', divisionId: nfcNorth.id})
        await Team.create({name: 'Buffalo Bills', divisionId: afcEast.id})
        await Team.create({name: 'Miami Dolphins', divisionId: afcEast.id})
        await Team.create({name: 'Denver Broncos', divisionId: afcWest.id})
        await Team.create({name: 'Kansas City Chiefs', divisionId: afcWest.id})
        await Team.create({name: 'Houston Texans', divisionId: afcSouth.id})
        await Team.create({name: 'Jacksonville Jaguars', divisionId: afcSouth.id})
    }
    catch(ex){
        console.log("error ",ex)
    }
}
syncAndSeed()

module.exports = { db, Team, Division, syncAndSeed }