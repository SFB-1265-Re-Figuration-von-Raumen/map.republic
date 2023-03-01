// import { IncomingForm } from 'formidable';
import { IncomingForm } from 'formidable';
import { getTokenFromServerCookie } from '@/lib/auth';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function changeAvatar(req, res) {
    console.log(req, res)
    if (req.method === 'POST') {
        console.log("req:", req, "res:", res)
        const data = await new Promise((resolve, reject) => {
            const form = new IncomingForm();

            form.parse(req, (err, fields) => {
                if (err) return reject(err);
                resolve({ fields });
            });
        })

        const { user_id } = data.fields;
        try {

            const { newAvatar } = data.fields
            const jwt = getTokenFromServerCookie(req);
            const userResponse = await fetch(
                `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${user_id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`,
                    },
                    body: JSON.stringify({
                        Avatar: newAvatar,
                    }),
                }
            );
            const data = await userResponse.json();
            return res.json({ message: 'success' });
        } catch (error) {
            console.error(JSON.stringify(error));
        }
    } else {
        return res.status(403).send('Forbidden');
    }
}