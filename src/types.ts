import { Elemental } from ".";
import { ClassArray } from "./ClassArray";

export type ElementType = 'a' | 'abbr' | 'address' | 'area' | 'article' | 'aside' | 'audio' | 
  'b' | 'base' | 'bdi' | 'bdo' | 'blockquote' | 'body' | 'br' | 'button' | 
  'canvas' | 'caption' | 'cite' | 'code' | 'col' | 'colgroup' | 'data' | 
  'datalist' | 'dd' | 'del' | 'details' | 'dfn' | 'dialog' | 'div' | 
  'dl' | 'dt' | 'em' | 'embed' | 'fieldset' | 'figcaption' | 'figure' | 
  'footer' | 'form' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 
  'head' | 'header' | 'hgroup' | 'hr' | 'html' | 'i' | 'iframe' | 'img' | 
  'input' | 'ins' | 'kbd' | 'label' | 'legend' | 'li' | 'link' | 'main' | 
  'map' | 'mark' | 'meta' | 'meter' | 'nav' | 'noscript' | 'object' | 'ol' | 
  'optgroup' | 'option' | 'output' | 'p' | 'param' | 'picture' | 'pre' | 
  'progress' | 'q' | 'rp' | 'rt' | 'ruby' | 's' | 'samp' | 'script' | 
  'section' | 'select' | 'small' | 'source' | 'span' | 'strong' | 'style' | 
  'sub' | 'summary' | 'sup' | 'svg' | 'table' | 'tbody' | 'td' | 'template' | 
  'textarea' | 'tfoot' | 'th' | 'thead' | 'time' | 'title' | 'tr' | 'track' | 
  'u' | 'ul' | 'var' | 'video' | 'wbr';

export type InputType = 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 
  'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 
  'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 
  'tel' | 'text' | 'time' | 'url' | 'week';

export type ListType = 'ul' | 'ol';

export type AttributeObject = Record<string, string>;

export type RuleAction = (selector: string, element: Elemental<any>) => void;

export class Rule {
  selectors: ClassArray;
  action: RuleAction;

  constructor(selectors: string | string[], action: RuleAction) {
    this.selectors = ClassArray.from(selectors);
    this.action = action;
  }
};
