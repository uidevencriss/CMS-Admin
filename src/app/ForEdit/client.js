"use client";
import React from "react";
import { Button,Puck, Render } from "../../core";
import config from "../config";
import { useDemoData} from "../libForEdit/use-demo-data"
import { createblogs } from "../../services/authService";
const Client = ({ path, isEdit })  => {

    const { data, resolvedData, key } = useDemoData({
        path,
        isEdit,
      });

      if (isEdit) {
        return (
          <div>
            <Puck
              config={config}
              data={data}
              onPublish={async (data) => {

                const apiBody = {
                  content: data.content,
                }
                const titleContent = apiBody.content[0]?.props?.text;
                // const generateHtmlContent = (content) => {
                  
                //   return content.map(item => {
                //     switch(item.type) {
                //       case 'Hero':
                //         // Assuming item.props contains an object with 'text' or other properties
                //         return `<div class="hero">${item.props.description || ''}</div>`;
                        
                //       case 'VerticalSpace':
                //         return `<div class="vertical-space" style="height: ${item.props.size || '0px'};"></div>`;
                        
                //       case 'Heading':
                //         return `<h2>${item.props.text || ''}</h2>`;
                        
                //       case 'Text':
                //         return `<p>${item.props.text || ''}</p>`;
                        
                //       case 'Columns':
                //         // Assuming item.props is an array of column data
                //         if (Array.isArray(item.props)) {
                //           return `<div class="columns">${item.props.map(col => `<div class="column">${col.text || ''}</div>`).join('')}</div>`;
                //         } else {
                //           return `<div class="columns">${item.props.text || ''}</div>`;
                //         }
                        
                //       case 'Stats':
                //         // Handle stats object; assuming it's an object with properties
                //         return `<div class="stats">${item.props.text || ''}</div>`;
                        
                //       case 'ButtonGroup':
                //         // Assuming item.props.buttons is an array of button objects
                //         return `<div class="button-group">${item.props.buttons.map(button => `<button>${button.text || 'Button'}</button>`).join('')}</div>`;
                        
                //       default:
                //         return '';
                //     }
                //   }).join('');
                // };
                
                // Generate HTML content from data.content
              //   const htmlContent = generateHtmlContent(data.content);
              // console.log(htmlContent)
             // debugger;
                const savedData = JSON.parse(localStorage.getItem("blogData"));
                console.log(savedData);
                const requestBody = {
                  BlogTitle: titleContent,
                  website: savedData.website,
                  coverImage: "https://dev-cmsautomations.s3.ap-south-1.amazonaws.com/assets/image/23d513dc-1592-40b3-a730-a797734f9aac.jpg",
                  PublishingStatus: savedData.PublishingStatus,
                  BlogTags: savedData.tags,
                  htmlBlogBody: `<html><body><pre>${JSON.stringify(apiBody, null, 2)}</pre></body></html>`,
                  BlogCategory: savedData.BlogCategory,
                  publisher_name: savedData.publisher_name,
                };
                //localStorage.setItem(key, JSON.stringify(response));
                localStorage.setItem(key, JSON.stringify(data));
               const response = await createblogs(requestBody);
               

        //         const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        // const url = URL.createObjectURL(blob);

        // // Trigger the download
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = "data.json"; // Specify the file name
        // link.click();

        // // Clean up the URL object
        // URL.revokeObjectURL(url);
              }}
            //   plugins={[headingAnalyzer]}
              headerPath={path}
              overrides={{
                headerActions: ({ children }) => (
                  <>
                    <div>
                      <Button href={path} newTab variant="secondary">
                        View page
                      </Button>
                    </div>
    
                    {children}
                  </>
                ),
              }}
            />
          </div>
        );
      }
   // debugger;
      if (data.content) {
        return <Render config={config} data={resolvedData} />;
      }
    
      return (
        <div
          style={{
            display: "flex",
            height: "100vh",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div>
            <h1>404</h1>
            <p>Page does not exist in session storage</p>
          </div>
        </div>
      );
  }
  
  export default Client;