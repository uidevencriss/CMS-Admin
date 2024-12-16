// puckConfig.js
import { DropZone } from "@measured/puck";
export const config = {

    components: {
        // Heading Block
        HeadingBlock: {
            fields: {

                Title: { type: "text" },
            },
            
            render: ({ Title }) => {
                return (

                    <div>
                        <h1>{Title}</h1>
                        <DropZone zone="my-content" />
                    </div>
                )
            },
        },

        // Paragraph Block
        ParagraphBlock: {
            fields: {
                children: { type: "text" },
            },
            render: ({ children }) => <p>{children}</p>,
        },

        // Image Block
        ImageBlock: {
            fields: {
                src: { type: "text" },
                alt: { type: "text" },
            },
            render: ({ src, alt }) => <img src={src} alt={alt} />,
        },

        // Button Block
        ButtonBlock: {
            fields: {
                label: { type: "text" },
                url: { type: "text" },
            },
            render: ({ label, url }) => <a href={url} className="btn">{label}</a>,
        },
    },
};

export const initialData = []; // Initial editor data (can be empty or preloaded)
