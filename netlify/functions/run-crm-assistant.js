export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }
  try {
    const { input } = JSON.parse(event.body || '{}');
    if (!input || typeof input !== 'string') {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing input (string)' })
      };
    }

    const simToken = process.env.SIM_API_TOKEN;
    if (!simToken) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'SIM_API_TOKEN not configured' })
      };
    }

    const res = await fetch(
      'https://www.sim.ai/api/workflows/25142af3-518e-4882-8d5d-f198a1e5e6ea/execute',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': simToken
        },
        body: JSON.stringify({ message: input })
      }
    );

    const txt = await res.text();
    let body;
    try {
      body = JSON.parse(txt);
    } catch {
      body = { raw: txt };
    }

    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
}
