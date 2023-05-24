describe('POST /sessions', () => {
    it('user session', () => {
        const user = {
            name: 'Fernando Papito',
            email: 'papito@yahoo.com',
            password: 'pwd123'
        }

        cy.postSession(user)
        .then(response => {
            expect(response.status).to.eq(200)
            expect(response.body.user.name).to.eq(user.name)
            expect(response.body.user.email).to.eq(user.email)
            expect(response.body.token).not.to.be.empty
        })
    })

    it('invalid password', () => {
        const user = {
            email: 'papito@yahoo.com',
            password: '123456'
        }

        cy.postSession(user)
        .then(response => {
            expect(response.status).to.eq(401)
        })
    })

    it('email not found', () => {
        const user = {
            email: '404@yahoo.com',
            password: '123456'
        }

        cy.postSession(user)
        .then(response => {
            expect(response.status).to.eq(401)
        })
    })

    
})
