import { NextResponse } from 'next/server';

const getBaseUrl = () => {
  const baseUrl = process.env.RAG_API_BASE_URL || process.env.NEXT_PUBLIC_RAG_API_BASE_URL;
  if (!baseUrl) {
    throw new Error('RAG_API_BASE_URL is not configured');
  }
  return baseUrl.replace(/\/+$/, '');
};

export async function POST(request) {
  try {
    const body = await request.json();
    const question = typeof body?.question === 'string' ? body.question.trim() : '';

    if (!question) {
      return NextResponse.json(
        { error: 'Please provide a question.' },
        { status: 400 }
      );
    }

    const baseUrl = getBaseUrl();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    let response;
    try {
      response = await fetch(`${baseUrl}/ask`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
        cache: 'no-store',
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const contentType = response.headers.get('content-type') || '';
    const data = contentType.includes('application/json')
      ? await response.json()
      : { result: await response.text() };

    if (!response.ok) {
      return NextResponse.json(
        { error: data?.error || data?.result || 'RAG service error.' },
        { status: 502 }
      );
    }

    if (typeof data?.result !== 'string') {
      return NextResponse.json(
        { error: 'Unexpected RAG response format.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ result: data.result }, { status: 200 });
  } catch (error) {
    const isTimeout = error?.name === 'AbortError';
    const message = error?.message === 'RAG_API_BASE_URL is not configured'
      ? 'RAG API base URL is not configured.'
      : isTimeout
        ? 'RAG service timed out. Please try again.'
        : 'Internal server error.';

    console.error('RAG ask error:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
