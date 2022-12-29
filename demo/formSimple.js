export default {
  "name": "My Form",
  "steps": [
      {
          "index": 0,
          "props": {
              "previousBtn": "Back",
              "nextBtn": "Next"
          },
          "inputs": [
              {
                  "label": "Text Content",
                  "type": "TextContent",
                  "props": {
                      "fields": {
                          "arr_content": [
                              {
                                  "html": "",
                                  "klass": "md:text-xl text-lg leading-loose"
                              }
                          ],
                          "validation": {
                              "required": false
                          }
                      },
                      "help_html": [],
                      "arr_html": [],
                      "inline": false
                  },
                  "key": "d3h4prkkwn"
              },
              {
                  "label": "Text Input",
                  "type": "Text",
                  "value": "",
                  "props": {
                      "arr_html": [
                          {
                              "html": "Full Name",
                              "klass": "md:text-xl text-lg leading-loose"
                          }
                      ],
                      "help_html": [
                          {
                              "html": "First Name",
                              "klass": "md:text-sm text-sm leading-loose"
                          }
                      ],
                      "fields": {
                          "placeholder": "",
                          "validation": {
                              "required": false
                          }
                      },
                      "inline": true
                  },
                  "key": "v19lse84ab"
              },
              {
                  "label": "Text Input",
                  "type": "Text",
                  "value": "",
                  "props": {
                      "arr_html": [
                          {
                              "html": "",
                              "klass": "md:text-xl text-lg leading-loose"
                          }
                      ],
                      "help_html": [
                          {
                              "html": "Last Name",
                              "klass": "md:text-sm text-sm leading-loose"
                          }
                      ],
                      "fields": {
                          "placeholder": "",
                          "validation": {
                              "required": false
                          }
                      },
                      "inline": false
                  },
                  "key": "ddnerzf9u2"
              }
          ]
      }
  ],
  "props": {
      "withMessage": false,
      "message": [
          {
              "html": "Thank you!! Your submission has been sent.",
              "klass": "text-center md:text-xl text-lg"
          }
      ]
  },
  "version": "18"
}