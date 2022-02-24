const express = require('express')
const app = express()

const { db, Team, Division, syncAndSeed } = require('./db')

app.get('/', (req, res) => res.redirect('/divisions'))

app.get('/divisions', async (req, res, next) => {
    try{
        const divisions = await Division.findAll()
        const html = divisions.map(division => `<div> ${division.name} <a href='/divisions/teams/${division.id}'>teams>> </a></div>`).join('')
        res.send(`<html>
                    <head><title>NFL DIVISIONS </title></head>
                    <body>
                        ${html}
                    </body>
                </html>`)
    }
    catch(ex){
        next(ex)
    }
})

app.get('/divisions/teams/:teamId', async (req, res, next) => {
    try{
        const teams = await Team.findAll({
            where: {
                divisionId: req.params.teamId
            }
        })
        const division = await Division.findByPk( req.params.teamId)

        const html = teams.map(team => `<div>${team.name}</div>`).join('')
        res.send(`<html>
                    <head><title>${division.name}</title></head>
                    <body>
                        ${html}
                    </body>
                  </html>`)

    }
    catch(ex){
        next(ex)
    }
})

const init = async (req, res, next) => {
    await syncAndSeed()
    console.log('Connected to database')
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log('listening on PORT ', PORT))
