import { Context } from "koa";
import { getManager } from "typeorm";
import { User } from "../entity/User";
import { Photo } from "../entity/Photo"
import * as fs from "fs"

const logger = require('consola')

export async function home(context) {
    context.response.type = 'html'
    context.response.body = fs.createReadStream('./src/view/index.html')
}

export async function postSaveAction(context: Context) {
    const photoRepository = getManager().getRepository(Photo);
    const userRepository = getManager().getRepository(User);
    const photo1 = new Photo();
    photo1.url = "me.jpg";
    await photoRepository.save(photo1);

    const photo2 = new Photo();
    photo2.url = "me-and-bears.jpg";
    await userRepository.save(photo2);

    const user = new User();
    user.name = "John";
    user.photos = [photo1, photo2];

    console.log('@#', user)
    await userRepository.save(user);
}
// export async function postSaveAction(context: Context) {
//     const postRepository = getManager().getRepository(User);

//     console.log('@#', context.request.body);

//     const newPost = postRepository.create(context.request.body);

//     console.log('@#', newPost);

//     await postRepository.save(newPost);

//     context.body = newPost;
// }