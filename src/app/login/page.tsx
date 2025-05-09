import { LoginForm } from '@/components/login-form';
import AltTitlebar from '@/titlebarAlt';
import AppIcon from '@/assets/app_icon';

export default function LoginPage() {
    const loginBgs = [
        'https://i.pinimg.com/736x/45/b7/00/45b700f8e20068c07b2478cfa49e5c74.jpg', // Van Gogh's paint montage
        'https://i.pinimg.com/736x/c2/b1/9b/c2b19b3d834d2fc25dba76904e9f2a5d.jpg', // nightsky forest
        'https://i.pinimg.com/736x/18/47/43/1847439cf9425db0179030403738b87f.jpg', // adventure time treehouse
        'https://i.pinimg.com/736x/7f/d1/4d/7fd14d1822bc3e200a15d464286a1686.jpg', // mr.kami house
        'https://i.pinimg.com/736x/80/57/db/8057dbd5c0bb410ca40e0b74833acfcd.jpg', // tanjiro views
        'https://i.pinimg.com/736x/54/b3/15/54b31548dd14b63a5b974288c793b7dc.jpg', // samurai doggo cryes
        'https://i.pinimg.com/736x/b6/34/8f/b6348fb9c4d244047888e5ee3ed555e8.jpg', // mc steve and doggo
        'https://i.pinimg.com/736x/f1/a5/64/f1a5640fe39cb3e00ec09929ad9a8ac5.jpg', // kid luffy stares
        'https://i.pinimg.com/736x/39/39/5e/39395ef38a1c20d018552a0f9b2e8595.jpg', // Ranpo Enogawa eating
        'https://i.pinimg.com/736x/82/eb/10/82eb102f4667abf588ce7e3434b8c657.jpg', // Tonikawa love birds
        'https://i.pinimg.com/736x/2d/aa/d8/2daad80dec13cbd97d12f97b71c83173.jpg', // Tsukasa yuzaki from Tonikawa
        'https://i.pinimg.com/736x/94/cf/83/94cf8331217a10d0ea1b18f3571c880e.jpg', // Kusuria no Hitorigoto - Apotecary diary
        'https://i.pinimg.com/736x/4e/35/00/4e3500e6d075b6368e7a6fee7e1205bc.jpg', // Neko
        'https://i.pinimg.com/736x/0b/5d/ae/0b5dae3c088feda03116efdf14e2dd31.jpg', // singing
        'https://i.pinimg.com/736x/42/1b/0a/421b0a3d361fc4841563ed98e347b38d.jpg', // colorful sing
        'https://i.pinimg.com/736x/57/3a/b9/573ab9186afd54e29d14c963ed4fdac7.jpg', // sweter yoo
        'https://i.pinimg.com/736x/29/08/14/290814ced066fcf95f23671f582ecebf.jpg', // asleep?
        'https://i.pinimg.com/736x/36/2f/2b/362f2b6af3a26b6069e73ec92b04f1e1.jpg', // kinda bored
        'https://i.pinimg.com/736x/00/c8/f0/00c8f0e1cfb667f6f0e28cff7d9b5cdb.jpg', // frieren asleep on grass
        'https://i.pinimg.com/736x/84/95/d5/8495d5b38ca2dbe17f05f8ed70bffad9.jpg', // frieren adventure
        'https://i.pinimg.com/736x/07/93/21/079321a9319b5f201f94dbf297d4fe40.jpg', // frieren shiny hungry
        'https://i.pinimg.com/736x/e6/f3/c3/e6f3c32e68a0d1d39a0edd20eb674702.jpg', // frieren hungry
        'https://i.pinimg.com/736x/bb/ca/8f/bbca8f6a2cfeab308ddf436c72aaf48d.jpg', // frieren table
        'https://i.pinimg.com/736x/88/08/3d/88083d6d4bd2846865df7a8f43413d93.jpg', // frieren talk group
        'https://i.pinimg.com/736x/ff/fe/20/fffe20ffcaebe5ae307b9a56a2c0838b.jpg', // after school lunch
        'https://i.pinimg.com/736x/c2/46/19/c246196bc0f86afb0a3732155c0c19ba.jpg', // Shikanoko horns
        'https://i.pinimg.com/736x/94/9d/f4/949df401db7a60ccbc008bd6363f7ffb.jpg', // Shikanoko at school
        'https://i.pinimg.com/736x/d5/4c/b0/d54cb0b3b73ad9199178cd32a483b598.jpg', // FACEE
        'https://i.pinimg.com/736x/f2/12/8e/f2128e2aa41beb1794d1fdd179202aa4.jpg', // Shikanoko air
        'https://i.pinimg.com/736x/db/01/e7/db01e70203520165de25721a90056a87.jpg', // Shikanoko points
        'https://i.pinimg.com/736x/13/55/2e/13552eed6429ea33a126a14506889747.jpg', // Maid Dragon: Kanna grab
        'https://i.pinimg.com/736x/71/6a/e7/716ae78527e5d806711da9178b422d59.jpg', // Maid Dragon: Kanna emotionless
        'https://i.pinimg.com/736x/ab/57/56/ab575601305efa40bb5b2735df9e5f8b.jpg', // Maid Dragon: Tooru smiles
        'https://i.pinimg.com/736x/65/c0/4f/65c04f335740fdc892359545779b40ea.jpg', // Maid Dragon: Kanna and Tooru stares
        'https://i.pinimg.com/736x/79/bd/33/79bd33994cf5a325c9b620f8c63f0a64.jpg', // Maid Dragon: Tooru annoyed
        'https://i.pinimg.com/736x/2b/84/96/2b849669b6b0c3e8c651eb3a92f11e26.jpg', // Maid Dragon: Tooru angry
        'https://i.pinimg.com/736x/41/18/8c/41188ce48a5590b3b969076447224010.jpg', // Noragami: eyes
        'https://i.pinimg.com/736x/d1/2b/e9/d12be97178d2aa8a604a087bd8e24bc5.jpg', // Mushoko Tensei: Sylphie
        'https://i.pinimg.com/736x/2c/8f/ba/2c8fba2f5b51cf7d330ea64e9b27d861.jpg', // Mushoko Tensei: grown Sylphie
        'https://i.pinimg.com/736x/48/b5/7e/48b57e99064452c77885b6d500d9f390.jpg', // Mushoko Tensei: Eris
        'https://i.pinimg.com/736x/c7/a7/7e/c7a77ef44a72e183eda9ca39b6719cf2.jpg', // Mushoko Tensei: end 2 temp
        'https://i.pinimg.com/736x/7f/5d/59/7f5d594be933501626d8e30b9bb4c769.jpg', // Mushoko Tensei: Roxy and Rudeus
        'https://i.pinimg.com/736x/fe/d7/45/fed745d4bf014e54394d3b5551d8cdd4.jpg', // Mushoko Tensei: Roxy thaught lil Rudeus
        'https://i.pinimg.com/736x/f9/8d/d4/f98dd45823d7d3f8dcccc853be119168.jpg', // Mushoko Tensei: Roxy and lil Rudeus stares at camera
        'https://i.pinimg.com/736x/97/66/92/9766925ed868b4abaafc3dff25e3aabb.jpg', // Mushoko Tensei: wallpaper
        'https://i.pinimg.com/736x/e9/3f/1a/e93f1a1ab3535710ee7f7fd1f047bf1d.jpg', // Horimiya: characters
        'https://i.pinimg.com/736x/e9/ea/57/e9ea57e721f8fd51ff9ffb3ba4dc004c.jpg', // Horimiya: group photo
        'https://i.pinimg.com/736x/ff/c1/66/ffc166046e04930c26baad971c324450.jpg', // Horimiya: couple
        'https://i.pinimg.com/736x/fa/3e/7d/fa3e7d43f367a7f9a1201c9e17c3a123.jpg', // Horimiya: Oranges?
        'https://i.pinimg.com/736x/0a/cf/86/0acf86b48d3bf6a02f6cc8ddeb9ee775.jpg', // Horimiya: jigsaw
        'https://i.pinimg.com/736x/bb/b9/f3/bbb9f38372fe3a89d5ad00f73e88cd94.jpg', // Horimiya: alone in school
        'https://i.pinimg.com/736x/55/c8/3f/55c83f8d6cfdf35eaeb79e28414e27fb.jpg', // Konosuba: group stare at camera
        'https://i.pinimg.com/736x/75/e7/d8/75e7d89aee47f2f4be88435289e43860.jpg', // Konosuba: Megumin explosion
        'https://i.pinimg.com/736x/a7/1d/29/a71d293dd26ac0f10224f9fc137240bf.jpg', // Konosuba: Megumin
        'https://i.pinimg.com/736x/66/69/1f/66691f2cfdb080aa3647e8679d97ef99.jpg', // Konosuba: Megumin distracted
        'https://i.pinimg.com/736x/d7/15/84/d71584920f4893a72f14fa2b100ae0e6.jpg', // Konosuba: Megumin EXPLOSION
        'https://i.pinimg.com/736x/82/0d/6e/820d6e2987fba0de0040b5828397bda5.jpg', // Konosuba: Aqua cryes
        'https://i.pinimg.com/736x/5e/4b/9f/5e4b9f883f180414a3eb5412a79a49b1.jpg', // Konosuba: Aqua cryes cute
        'https://i.pinimg.com/736x/1b/2a/6f/1b2a6f6c127cae134555e3fa299d03f3.jpg', // Konosuba: Aqua cryes cute 2
        'https://i.pinimg.com/736x/6d/fb/9c/6dfb9c104179b011baae6b688dd34fbc.jpg', // Konosuba: Aqua cryes to the wall
        'https://i.pinimg.com/736x/ed/a5/4c/eda54cf41b5d91eee112e56519af01e6.jpg', // Konosuba: Wiz bunny
        'https://i.pinimg.com/736x/1d/e0/50/1de05064aa1afc14ca66471e3de724a3.jpg', // Konosuba: Kazuma rest on Wiz chest
        'https://i.pinimg.com/736x/7c/7a/59/7c7a597936ab4749885669dd57d42202.jpg', // Konosuba: Darkness attacks
        'https://i.pinimg.com/736x/aa/62/61/aa6261548f8f4291d662938f76102afc.jpg', // Konosuba: Darkness shy
        'https://i.pinimg.com/736x/eb/01/7a/eb017a75378b823d20405b6f0b15d649.jpg', // Tokidoki Bosotto: eyes
        'https://i.pinimg.com/736x/e6/b9/ab/e6b9abc369c3f50bfaa528e37539672b.jpg', // Tokidoki Bosotto: holding hands
        'https://i.pinimg.com/736x/d2/46/07/d24607ea2d1de155d1c52b6dc2b65785.jpg', // Tokidoki Bosotto: flushed
        'https://i.pinimg.com/736x/32/c9/48/32c9486a4128c2393d182fd926f11d5a.jpg', // Tokidoki Bosotto: holding camera
        'https://i.pinimg.com/736x/be/eb/80/beeb80ef3c79d7a8baca4706d9133ec7.jpg', // Tokidoki Bosotto: sparkles stare
        'https://i.pinimg.com/736x/66/3f/d7/663fd7ed5395c9b7a75abc781027daa0.jpg', // Tokidoki Bosotto: THAT stare
        'https://i.pinimg.com/736x/68/77/6d/68776d06f61e8195c79ce131217bd4b1.jpg', // Tokidoki Bosotto: looking back
        'https://i.pinimg.com/736x/be/e1/47/bee147c41b8cf84a376516eca71d2692.jpg', // Tokidoki Bosotto: annoyed stare
        'https://i.pinimg.com/736x/59/51/cf/5951cf0a434b34707f6729c18308751b.jpg', // Tokidoki Bosotto: measure
        'https://i.pinimg.com/736x/78/68/d9/7868d9ccfb98cc1bcfea4ec0c72184bb.jpg', // Tokidoki Bosotto: big brain
        'https://i.pinimg.com/736x/ed/c0/ed/edc0ed061b21b01e11fb93d2b38f94bf.jpg', // Tokidoki Bosotto: WHAT?!
        'https://i.pinimg.com/736x/15/08/ea/1508ea101048bc497e3e19c74de0c0f3.jpg', // Tokidoki Bosotto: listen here
        'https://i.pinimg.com/736x/d9/d0/ef/d9d0ef2d8a9b580684e76b2b8d16b6bc.jpg', // Tokidoki Bosotto: Hi *flush*
        'https://i.pinimg.com/736x/d5/70/1a/d5701a776dc6b3f64565d0f3e3ff5983.jpg', // Tokidoki Bosotto: happy
    ];

    return (
        <div className="w-screen h-screen overflow-hidden">
            <AltTitlebar />
            <div
                style={{
                    backgroundImage: `url("${
                        loginBgs[Math.floor(Math.random() * loginBgs.length)]
                        // loginBgs[loginBgs.length - 1]
                    }")`,
                }}
                className="flex h-full flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10 bg-no-repeat bg-cover bg-center"
            >
                <div className="flex w-full h-full max-w-sm justify-center flex-col gap-6">
                    <div className="flex items-center gap-2 self-center flex-col font-medium">
                        <div className="flex size-25 items-center justify-center rounded-md bg-[#f9e7a9] text-primary-foreground">
                            <AppIcon className="size-30" />
                        </div>
                        {/* Anime Pack */}
                    </div>
                    <LoginForm className="" />
                </div>
            </div>
        </div>
    );
}
