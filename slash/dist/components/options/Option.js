import {
  ApplicationCommandOptionType
} from "../../slash/ApplicationCommand.js";
import {Button, Card, Col, Row, Space, Switch, Typography} from "../../../web_modules/antd.js";
import React, {useEffect, useState} from "../../../web_modules/react.js";
import {commandState, optionElementState} from "../../recoil/index.js";
import GenericInput2 from "./GenericInput.js";
import {useRecoilState} from "../../../web_modules/recoil.js";
function Option({type, index}) {
  const [option, setOption] = useState({
    key: `${ApplicationCommandOptionType[type]}Option-${index}`,
    type,
    name: "",
    description: ""
  });
  const [command, setCommand] = useRecoilState(commandState);
  useEffect(() => {
    if (command.options) {
      setCommand({
        ...command,
        options: [
          ...command.options.filter((o) => o.key !== option.key),
          option
        ]
      });
    }
  }, [option]);
  const [required, setRequired] = useState(false);
  useEffect(() => {
    setOption({...option, required});
  }, [required]);
  const [_default, setDefault] = useState(false);
  useEffect(() => {
    setOption({...option, default: _default});
  }, [_default]);
  const [optionElements, setOptionElements] = useRecoilState(optionElementState);
  function deleteOption() {
    if (command.options) {
      setCommand({
        ...command,
        options: command.options.filter((o) => o.key !== option.key)
      });
    }
    setOptionElements(optionElements.filter((elem) => elem.key !== option.key));
  }
  return /* @__PURE__ */ React.createElement(Card, {
    title: ApplicationCommandOptionType[type],
    bordered: false
  }, /* @__PURE__ */ React.createElement(Space, {
    direction: "vertical",
    style: {width: "100%"}
  }, /* @__PURE__ */ React.createElement(GenericInput2, {
    name: "name",
    setter: [option, setOption]
  }), /* @__PURE__ */ React.createElement(GenericInput2, {
    name: "description",
    setter: [option, setOption]
  }), /* @__PURE__ */ React.createElement(Row, null, /* @__PURE__ */ React.createElement(Col, {
    span: 6
  }, /* @__PURE__ */ React.createElement(Typography.Title, {
    level: 5
  }, "Required?"), /* @__PURE__ */ React.createElement(Switch, {
    checked: required,
    onChange: (checked) => setRequired(checked)
  })), /* @__PURE__ */ React.createElement(Col, {
    span: 6
  }, /* @__PURE__ */ React.createElement(Typography.Title, {
    level: 5
  }, "Default?"), /* @__PURE__ */ React.createElement(Switch, {
    checked: _default,
    onChange: (checked) => setDefault(checked)
  })), /* @__PURE__ */ React.createElement(Col, {
    flex: "auto"
  }, /* @__PURE__ */ React.createElement(Row, {
    align: "middle",
    justify: "end"
  }, /* @__PURE__ */ React.createElement(Space, {
    align: "center"
  }, /* @__PURE__ */ React.createElement(Button, {
    danger: true,
    type: "primary",
    size: "large",
    onClick: deleteOption
  }, "Delete")))))));
}
export default Option;
