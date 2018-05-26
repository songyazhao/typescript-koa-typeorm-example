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
    let { photos } = context.request.body;

    photos = await photoRepository.save(photos)

    const newPost = { ...context.request.body, photos };
    await userRepository.save(newPost);

    context.body = newPost;
}

export async function postSaveAction2(context: Context) {
    const photoRepository = getManager().getRepository(Photo);
    const userRepository = getManager().getRepository(User);
    const photo1 = new Photo();
    photo1.url = "me.jpg";
    await photoRepository.save(photo1);

    const photo2 = new Photo();
    photo2.url = "me-and-bears.jpg";
    await photoRepository.save(photo2);

    const user = new User();
    user.name = "John";
    user.photos = [photo1, photo2];

    await userRepository.save(user);
}

export async function postSaveAction3(context: Context) {
    const photoRepository = getManager().getRepository(Photo);
    const userRepository = getManager().getRepository(User);
    const user = new User();
    user.name = "Leo";
    await userRepository.save(user);

    const photo1 = new Photo();
    photo1.url = "me.jpg";
    photo1.user = user;
    await photoRepository.save(photo1);

    const photo2 = new Photo();
    photo2.url = "me-and-bears.jpg";
    photo2.user = user;
    await photoRepository.save(photo2);
}