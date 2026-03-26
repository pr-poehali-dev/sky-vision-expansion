import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохраняет заявку (имя и email) в базу данных."""
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    raw = event.get('body') or '{}'
    body = json.loads(raw) if isinstance(raw, str) else raw
    name = (body.get('name') or '').strip()
    email = (body.get('email') or '').strip()

    if not name or not email:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': {'error': 'Имя и email обязательны'}
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO applications (name, email) VALUES (%s, %s) RETURNING id",
        (name, email)
    )
    app_id = cur.fetchone()[0]
    conn.commit()
    cur.close()
    conn.close()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': {'success': True, 'id': app_id}
    }