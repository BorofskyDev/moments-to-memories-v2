// app/api/admin/create-admin/route.js

import admin from '@/libs/firebaseAdmin'

export async function POST(request) {
  console.log('Received POST request to create-admin')

  // Verify the user is authenticated and is an admin
  const authHeader = request.headers.get('authorization')
  console.log('Authorization header:', authHeader)

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log('Unauthorized: Missing or invalid Authorization header')
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const idToken = authHeader.split('Bearer ')[1]
  console.log('ID Token:', idToken)

  try {
    // Verify the ID token and decode it
    const decodedToken = await admin.auth().verifyIdToken(idToken)
    console.log('Decoded Token:', decodedToken)

    if (!decodedToken.admin) {
      console.log('Forbidden: User is not an admin')
      return new Response(
        JSON.stringify({ message: 'Forbidden: Not an admin' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Parse the JSON body
    const body = await request.json()
    const { email } = body
    console.log('Email to promote:', email)

    if (!email) {
      console.log('Bad Request: Email is required')
      return new Response(JSON.stringify({ message: 'Email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Get user by email
    const user = await admin.auth().getUserByEmail(email)
    console.log('User found:', user.uid)

    // Set custom claim
    await admin.auth().setCustomUserClaims(user.uid, { admin: true })
    console.log('Admin claim set for user:', user.uid)

    return new Response(
      JSON.stringify({ message: `${email} has been made an admin.` }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error creating admin:', error)
    return new Response(
      JSON.stringify({
        message: 'Internal Server Error',
        error: error.message,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
