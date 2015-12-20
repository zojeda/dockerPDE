require('json-editor');
let aje = require('angular-json-editor');

require('ace/ace');
require('ace/ext-language_tools');
require('ace/mode-markdown');
require('ace/snippets/markdown');

let $ = require('jquery');
import 'select2';
import 'select2/dist/css/select2.min.css';
import './result-repo.css';

import DockerDefinitionDirective from './definitionEditor.directive';


export default angular.module('dockerPDE.definitionEditor', ['angular-json-editor'])
  .directive('definition', DockerDefinitionDirective.instance)
  .config((JSONEditorProvider) => {
    JSONEditorProvider.configure({
      required_by_default: true,
      plugins: {
        ace: {
          //                  enableBasicAutocompletion: true
								},
        selectize: {
          enable: true
        }

      }
    })
  })
  .run((JSONEditor) => {
    JSONEditor.defaults.resolvers.unshift((schema) => {
      if (schema.type === "string" && schema.source === "github") {
        return "github";
      }
    });
    JSONEditor.defaults.editors.github = JSONEditor.AbstractEditor.extend({
      build: function() {
        if (!this.options.compact) this.header = this.label = this.theme.getFormInputLabel(this.getTitle());
        if (this.schema.description) this.description = this.theme.getFormInputDescription(this.schema.description);

        if (this.options.compact) this.container.className += ' compact';

        this.input = this.theme.getSelectInput(this.enum_options);
        this.container.appendChild(this.input);
      },
      postBuild: function() {
        function formatRepo(repo) {
          if (repo.loading) return repo.text;

          var markup = `<div class='select2-result-repository clearfix'>
            <div class='select2-result-repository__avatar'><img src='${repo.owner.avatar_url}' /></div>
            <div class='select2-result-repository__meta'>
            <div class='select2-result-repository__title'>${repo.full_name}</div>`;

          if (repo.description) {
            markup += `<div class='select2-result-repository__description'>${repo.description}</div>`;
          }

          markup += `<div class='select2-result-repository__statistics'>
          <div class='select2-result-repository__forks'><i class='fa fa-flash'></i> ${repo.forks_count} Forks</div>
          <div class='select2-result-repository__stargazers'><i class='fa fa-star'></i> ${repo.stargazers_count} Stars</div>
          <div class='select2-result-repository__watchers'><i class='fa fa-eye'></i> ${repo.watchers_count} Watchers</div>
          </div>
          </div></div>`;

          return markup;
        }

        function formatRepoSelection(repo) {
          return repo.full_name || repo.text;
        }

        $(this.input).select2({
          ajax: {
            url: "https://api.github.com/search/repositories",
            dataType: 'json',
            delay: 250,
            data: function(params) {
              return {
                q: params.term, // search term
                page: params.page
              };
            },
            processResults: function(data, params) {
              // parse the results into the format expected by Select2
              // since we are using custom formatting functions we do not need to
              // alter the remote JSON data, except to indicate that infinite
              // scrolling can be used
              params.page = params.page || 1;

              return {
                results: data.items,
                pagination: {
                  more: (params.page * 30) < data.total_count
                }
              };
            },
            cache: true
          },
          escapeMarkup: function(markup) { return markup; },
          minimumInputLength: 1,
          templateResult: formatRepo,
          templateSelection: formatRepoSelection
        });
      }

    });
  })
  .name;