// import { IncomingForm } from 'formidable';
import { IncomingForm } from 'formidable';
import { getTokenFromServerCookie } from '@/lib/auth';

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

export default async function changeAvatar(req, res) {
    console.log(`zeig cookie\n${req.headers.cookie}`)
    if (req.method === 'POST') {

        const { Avatar, user_id } = req.body;
        try {
            console.log(`req.body: ${JSON.stringify(req.body)}`)

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
                        Avatar: Avatar,
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

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export default async function changeAvatar(req, res) {
//   if (req.method === 'POST') {
//     const { newAvatar, user_id } = req.body;
//     try {
//       const jwt = getTokenFromServerCookie(req);

//       const userResponse = await fetch(
//         `${process.env.NEXT_PUBLIC_STRAPI_URL}/users/${user_id}`,
//         {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${jwt}`,
//           },
//           body: JSON.stringify({
//             Avatar: avatar,
//           }),
//         }
//       );

//       const data = await userResponse.json();
//       return res.json({ message: 'success' });
//     } catch (error) {
//       console.error(JSON.stringify(error));
//       return res.status(500).json({ message: 'error' });
//     }
//   } else {
//     return res.status(403).send('Forbidden');
//   }
// }