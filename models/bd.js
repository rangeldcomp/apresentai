const Pool = require('pg').Pool
const config = {
    host: 'localhost',
    user: 'postgres',
    password: 'ggafts',
    database: 'postgres',
    schema: 'bd_apresentai'
}

const pool = new Pool(config)

module.exports = {
    Pool: Pool,
    pool: pool
}