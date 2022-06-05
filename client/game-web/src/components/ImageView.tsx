import imagePath1 from "components/images/3e5563aa-2280-4540-a07b-8b22c4d6968a.jpg";
import imagePath2 from "components/images/446add50-cbfa-4e98-bb94-40e1dd3c24b6.jpg";
import imagePath3 from "components/images/625830cd-d14f-41b2-b200-be46088c6a0e.webp";
import imagePath4 from "components/images/6f051c48-edba-406a-9bfc-0ff1d1a115e1.jpg";
import imagePath5 from "components/images/9cb07489-5a23-45a0-9c04-0b65fe5bbeb6.jpg";
import imagePath6 from "components/images/3a85baf1-c40a-4c9c-98ac-235ff20c49dc.jpg";
import imagePath7 from "components/images/9fe3448e-53bd-43b1-9db7-20b48a2d4e09.png";
import imagePath8 from "components/images/a3d10528-3927-407b-bf37-87330f3a5e1f.webp";
import imagePath9 from "components/images/e78522eb-46d3-4edb-8873-7970dc891e27.jpg";
import imagePath10 from "components/images/f1af7062-0282-47a8-8456-4e1b598ed64c.png";


export function getImagePath(id: string){
    const dict = new Map<string, string>()
    dict.set("3e5563aa-2280-4540-a07b-8b22c4d6968a", imagePath1);
    dict.set("446add50-cbfa-4e98-bb94-40e1dd3c24b6", imagePath2);
    dict.set("625830cd-d14f-41b2-b200-be46088c6a0e", imagePath3);
    dict.set("6f051c48-edba-406a-9bfc-0ff1d1a115e1", imagePath4);
    dict.set("9cb07489-5a23-45a0-9c04-0b65fe5bbeb6", imagePath5);
    dict.set("3a85baf1-c40a-4c9c-98ac-235ff20c49dc", imagePath6);
    dict.set("9fe3448e-53bd-43b1-9db7-20b48a2d4e09", imagePath7);
    dict.set("a3d10528-3927-407b-bf37-87330f3a5e1f", imagePath8);
    dict.set("e78522eb-46d3-4edb-8873-7970dc891e27", imagePath9);
    dict.set("f1af7062-0282-47a8-8456-4e1b598ed64c", imagePath10);

    return dict.get(id);
}